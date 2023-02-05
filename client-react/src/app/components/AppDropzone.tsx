import {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import {useController, UseControllerProps} from "react-hook-form";
import {FormControl, FormHelperText, Typography, useMediaQuery, useTheme} from "@mui/material";
import {UploadFile} from "@mui/icons-material";

interface Props extends UseControllerProps {}

export default function AppDropzone(props: Props) {
    const {fieldState, field} = useController({...props, defaultValue: null});

    const dzStyles = {
        display: 'flex',
        border: 'dashed 3px #eee',
        borderColor: '#eee',
        borderRadius: '5px',
        paddingTop: '30px',
        alignItems: 'center',
        maxHeight: 200,
        maxWidth: 550
    }

    const dzActive = {
        borderColor: 'green'
    }

    const onDrop = useCallback((acceptedFiles: any) => {
        acceptedFiles[0] = Object.assign(acceptedFiles[0],
            {preview: URL.createObjectURL(acceptedFiles[0])});
        field.onChange(acceptedFiles[0]);
    }, [field])
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

    const theme= useTheme();
    const isMatch = useMediaQuery(theme.breakpoints.down('lg'));

    return (
        <div {...getRootProps()}>
            {isMatch ? (<FormControl sx={{marginRight: 2}} style={isDragActive ? {...dzStyles, ...dzActive} : dzStyles} error={!!fieldState.error}>
                <input {...getInputProps()} />
                <UploadFile sx={{fontSize: '50px'}} />
                <Typography variant='h6' justifyContent='center'>Przeciągnij zdjęcie</Typography>
                <FormHelperText>{fieldState.error?.message}</FormHelperText>
            </FormControl>) : (<FormControl style={isDragActive ? {...dzStyles, ...dzActive} : dzStyles} error={!!fieldState.error}>
                <input {...getInputProps()} />
                <UploadFile sx={{fontSize: '90px'}} />
                <Typography variant='h6' justifyContent='center'>Przeciągnij zdjęcie tutaj</Typography>
                <FormHelperText>{fieldState.error?.message}</FormHelperText>
            </FormControl>)}

        </div>
    )
}