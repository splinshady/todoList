import React from 'react'
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {FormikHelpers, useFormik} from "formik";
import {loginTC} from "./auth-reducer";
import {useSelector} from "react-redux";
import {Navigate} from "react-router-dom";
import {AppRootStateType} from "../../app/store";
import {useAppDispatch} from "../../utils/hooks-ts";
import style from "./Login.module.css";

export const Login = () => {
  const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
  const dispatch = useAppDispatch()

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false
    },
    validate: (values) => {
      const errors: FormikErrorType = {}
      if (!values.email) {
        errors.email = 'Required'
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
      }
      if (!values.password) {
        errors.password = 'Required'
      } else if (values.password.length < 3) {
        errors.password = 'Password length should be more then 3 '
      }
      return errors
    },
    onSubmit: async (values: FormikHelpersType, formikHelpers: FormikHelpers<FormikHelpersType>) => {
      const action = await dispatch(loginTC(values))
      if (loginTC.rejected.match(action)) {
        if (action.payload?.fieldsErrors?.length) {
          const error = action.payload?.fieldsErrors[0]
          formikHelpers.setFieldError(error.field, error.error)
        }
      }
    },
  })

  if (isLoggedIn) {
    return <Navigate to={"/"}/>
  }

  return <Grid container justifyContent={'center'}>
    <Grid item justifyContent={'center'}>
      <form onSubmit={formik.handleSubmit}>
        <FormControl>
          <FormGroup className={style.form}>

            <TextField className={style.form_item}
                       label="Email"
                       margin="normal"
                       error={!!formik.errors.email && formik.touched.email}
                       helperText={formik.touched.email && formik.errors.email}
                       {...formik.getFieldProps('email')}/>

            <TextField className={style.form_item}
                       type="password"
                       label="Password"
                       margin="normal"
                       error={!!formik.errors.password && formik.touched.password}
                       helperText={formik.touched.password && formik.errors.password}
                       {...formik.getFieldProps('password')}/>

            <FormControlLabel label={'Remember me'}
                              control={<Checkbox/>}
                              checked={formik.values.rememberMe}
                              {...formik.getFieldProps('rememberMe')}/>
            <Button type={'submit'} variant={'contained'} color={'primary'}>
              Login
            </Button>
          </FormGroup>
        </FormControl>
      </form>
    </Grid>
  </Grid>
}

type FormikErrorType = {
  email?: string
  password?: string
  rememberMe?: boolean
}

type FormikHelpersType = {
  email: string
  password: string
  rememberMe: boolean
}