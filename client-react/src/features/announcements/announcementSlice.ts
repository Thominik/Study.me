import {createAsyncThunk, createEntityAdapter, createSlice} from "@reduxjs/toolkit";
import {Announcement, AnnouncementParams} from "../../app/models/announcement";
import agent from "../../app/api/agent";
import {RootState} from "../../store/configureStore";
import {MetaData} from "../../app/models/pagination";

interface CatalogState {
    announcementsLoaded: boolean;
    status: string;
    announcementParams: AnnouncementParams;
    metaData: MetaData | null;
}

const announcementAdapter = createEntityAdapter<Announcement>();

function getAxiosParams(announcementParams: AnnouncementParams) {
    const params = new URLSearchParams();
    params.append('pageNumber', announcementParams.pageNumber.toString());
    params.append('pageSize', announcementParams.pageSize.toString());
    params.append('orderBy', announcementParams.orderBy);
    if (announcementParams.searchTerm) params.append('searchTerm', announcementParams.searchTerm);
    if (announcementParams.cityTerm) params.append('cityTerm', announcementParams.cityTerm);
    if (announcementParams.subjectLessonTerm) params.append('subjectLessonTerm', announcementParams.subjectLessonTerm);
    return params;
}

export const fetchAnnouncementsAsync = createAsyncThunk<Announcement[], void, {state: RootState}>(
    'catalog/fetchAnnouncementsAsync',
    async (_, thunkAPI) => {
        const params = getAxiosParams(thunkAPI.getState().catalog.announcementParams);
        try {
            const response = await agent.Catalog.list(params);
            thunkAPI.dispatch(setMetaData(response.metaData));
            return response.items;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({error: error.data})
        }
    }
)

export const fetchAnnouncementAsync = createAsyncThunk<Announcement, number>(
    'catalog/fetchAnnouncementAsync',
    async (announcementId, thunkAPI) => {
        try {
            return await agent.Catalog.details(announcementId);
        } catch (error: any) {
            return thunkAPI.rejectWithValue({error: error.data})
        }
    }
)

function initParams() {
    return {
        pageNumber: 1,
        pageSize: 4,
        orderBy: 'title'
    }
}

export const catalogSlice = createSlice({
    name: 'catalog',
    initialState: announcementAdapter.getInitialState<CatalogState>({
        announcementsLoaded: false,
        status: 'idle',
        announcementParams: initParams(),
        metaData: null
    }),
    reducers: {
        setAnnouncementParams: (state, action) => {
            state.announcementsLoaded = false;
            state.announcementParams = {...state.announcementParams, ...action.payload, pageNumber: 1};
        },
        setPageNumber: (state, action) => {
          state.announcementsLoaded = false;
          state.announcementParams = {...state.announcementParams, ...action.payload};
        },
        setMetaData: (state, action) => {
            state.metaData = action.payload;
        },
        resetAnnouncementParams: (state) => {
            state.announcementParams = initParams();
        },
        setAnnouncement: (state, action) => {
            announcementAdapter.upsertOne(state, action.payload);
        }
    },
    extraReducers: (builder => {
        builder.addCase(fetchAnnouncementsAsync.pending, (state) => {
            state.status = 'pendingFetchAnnouncements';
        });
        builder.addCase(fetchAnnouncementsAsync.fulfilled, (state, action) => {
            announcementAdapter.setAll(state, action.payload);
            state.status = 'idle';
            state.announcementsLoaded = true;
        });
        builder.addCase(fetchAnnouncementsAsync.rejected, (state, action) => {
            console.log(action.payload);
            state.status = 'idle';
        });
        builder.addCase(fetchAnnouncementAsync.pending, (state) => {
            state.status = 'pendingFetchAnnouncement';
        });
        builder.addCase(fetchAnnouncementAsync.fulfilled, (state, action) => {
            announcementAdapter.upsertOne(state, action.payload);
            state.status = 'idle';
        });
        builder.addCase(fetchAnnouncementAsync.rejected, (state, action) => {
            console.log(action);
            state.status = 'idle';
        })
    })
})

export const announcementSelectors = announcementAdapter.getSelectors((state: RootState) => state.catalog);

export const {setAnnouncementParams, resetAnnouncementParams, setMetaData, setPageNumber, setAnnouncement} = catalogSlice.actions;