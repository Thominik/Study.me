// @ts-ignore
import * as yup from 'yup';

export const validationSchema = yup.object({
    announcementTitle: yup.string().required(),
    subjectLesson: yup.string().required(),
    location: yup.string().required(),
    price: yup.number().required().moreThan(1),
    onlineLesson: yup.string().required(),
    description: yup.string().required(),
    phoneNumber: yup.number().required().moreThan(1),
    skypeNumber: yup.string().required(),
    file: yup.mixed().when('photoUrl', {
        is: (value: string) => !value,
        then: yup.mixed().required('Musisz dodać zdjęcie')
    }),
    firstName: yup.string().required(),
    lastName: yup.string().required(),
})