import {createAsyncThunk, createEntityAdapter, createSlice} from "@reduxjs/toolkit";
import {Announcement} from "../../app/models/announcement";
import agent from "../../app/api/agent";
import {RootState} from "../../store/configureStore";

const announcementAdapter = createEntityAdapter<Announcement>();

export const fetchAnnouncementsAsync = createAsyncThunk<Announcement[]>(
    'catalog/fetchAnnouncementsAsync',
    async () => {
        try {
            return await agent.Catalog.list();
        } catch (error) {
            console.log(error);
        }
    }
)

export const fetchAnnouncementAsync = createAsyncThunk<Announcement, number>(
    'catalog/fetchAnnouncementAsync',
    async (announcementId) => {
        try {
            return await agent.Catalog.details(announcementId);
        } catch (error) {
            console.log(error);
        }
    }
)

export const catalogSlice = createSlice({
    name: 'catalog',
    initialState: announcementAdapter.getInitialState({
        announcementsLoaded: false,
        status: 'idle'
    }),
    reducers: {},
    extraReducers: (builder => {
        builder.addCase(fetchAnnouncementsAsync.pending, (state) => {
            state.status = 'pendingFetchAnnouncements';
        });
        builder.addCase(fetchAnnouncementsAsync.fulfilled, (state, action) => {
            announcementAdapter.setAll(state, action.payload);
            state.status = 'idle';
            state.announcementsLoaded = true;
        });
        builder.addCase(fetchAnnouncementsAsync.rejected, (state) => {
            state.status = 'idle';
        });
        builder.addCase(fetchAnnouncementAsync.pending, (state) => {
            state.status = 'pendingFetchAnnouncement';
        });
        builder.addCase(fetchAnnouncementAsync.fulfilled, (state, action) => {
            announcementAdapter.upsertOne(state, action.payload);
            state.status = 'idle';
        });
        builder.addCase(fetchAnnouncementAsync.rejected, (state) => {
            state.status = 'idle';
        })
    })
})

export const announcementSelectors = announcementAdapter.getSelectors((state: RootState) => state.catalog);