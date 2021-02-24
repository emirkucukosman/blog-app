import React from 'react'
import { connect } from 'react-redux'
import { Formik } from 'formik'
import * as Yup from 'yup'
import clsx from 'clsx'
import { useSnackbar } from 'notistack'
import blogAPI from '../../../utils/blogAPI'
import {
    TextField,
    Box,
    FormHelperText,
    Button,
    makeStyles
} from '@material-ui/core'
import useIsMountedRef from '../../../hooks/useIsMountedRef'

const useStyles = makeStyles(() => ({
    root: {}
}));

const Form = ({ className, auth, ...rest }) => {
    const classes = useStyles();
    const isMountedRef = useIsMountedRef();
    const { enqueueSnackbar } = useSnackbar();

    return (
        <Formik
            initialValues={{
                title: '',
                body: '',
                submit: null,
                status: {
                    success: null
                }
            }}
            validationSchema={Yup.object().shape({
                title: Yup.string().max(255).required('Title is required'),
                body: Yup.string().max(255).required('Body is required')
            })}
            onSubmit={async (values, {
                setErrors,
                setStatus,
                setSubmitting,
                resetForm,
            }) => {
                try {
                    await blogAPI.post('/api/blog', { title: values.title, body: values.body, author: auth.user.username })

                    if (isMountedRef.current) {
                        setStatus({ success: true });
                        setSubmitting(false);
                        resetForm({});
                        enqueueSnackbar('Blog Created', { variant: 'success' })
                    }
                } catch (err) {
                    if (isMountedRef.current) {
                        setStatus({ success: false });
                        setErrors({ submit: (err.response && err.response.data.message) || "Unexpected error has occured" });
                        setSubmitting(false);
                    }
                }
            }}
        >
            {({
                errors,
                status,
                handleBlur,
                handleChange,
                handleSubmit,
                isSubmitting,
                touched,
                values
            }) => (
                <form
                    noValidate
                    onSubmit={handleSubmit}
                    className={clsx(classes.root, className)}
                    {...rest}
                >
                    <TextField
                        error={Boolean(touched.title && errors.title)}
                        fullWidth
                        autoFocus
                        helperText={touched.title && errors.title}
                        label="Title"
                        margin="normal"
                        name="title"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        type="text"
                        value={values.title}
                        variant="outlined"
                    />
                    <TextField
                        error={Boolean(touched.body && errors.body)}
                        fullWidth
                        helperText={touched.body && errors.body}
                        label="Body"
                        margin="normal"
                        name="body"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        type="text"
                        multiline
                        rows={4}
                        value={values.password}
                        variant="outlined"
                    />
                    {errors.submit && (
                        <Box mt={2}>
                            <FormHelperText error style={{ fontSize: ".975rem" }}>
                                {errors.submit}
                            </FormHelperText>
                        </Box>
                    )}
                    <Box mt={2}>
                        <Button
                            color="primary"
                            disabled={isSubmitting}
                            size="large"
                            type="submit"
                            variant="contained"
                        >
                            Create Blog
                        </Button>
                    </Box>
                </form>
            )}
        </Formik>
    )
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(
    mapStateToProps, null
)(Form);
