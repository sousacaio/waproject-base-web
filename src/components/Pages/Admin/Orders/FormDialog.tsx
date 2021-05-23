import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import Slide from '@material-ui/core/Slide';
import makeStyles from '@material-ui/core/styles/makeStyles';
import ErrorMessage from 'components/Shared/ErrorMessage';
import TextField from 'components/Shared/Fields/Text';
import Toast from 'components/Shared/Toast';
import { logError } from 'helpers/rxjs-operators/logError';
import { useFormikObservable } from 'hooks/useFormikObservable';
import IUser from 'interfaces/models/user';
import React, { forwardRef, Fragment, memo, useCallback } from 'react';
import { useRetryableObservable } from 'react-use-observable';
import { tap } from 'rxjs/operators';
import userService from 'services/user';
import * as yup from 'yup';

interface IProps {
  opened: boolean;
  user?: IUser;
  onComplete: (user: IUser) => void;
  onCancel: () => void;
}

const validationSchema = yup.object().shape({
  name: yup.string().required().min(3).max(50),
  description: yup.string().required().min(5),
  userId: yup.number().required(),
  quantity: yup.number().required().min(1)
});

const useStyle = makeStyles({
  content: {
    width: 600,
    maxWidth: 'calc(95vw - 50px)'
  },
  heading: {
    marginTop: 20,
    marginBottom: 10
  }
});

const FormDialog = memo((props: IProps) => {
  const classes = useStyle(props);

  const formik = useFormikObservable<IUser>({
    initialValues: { roles: [] },
    validationSchema,
    onSubmit(model) {
      return userService.save(model).pipe(
        tap(user => {
          Toast.show(`${user.firstName} foi salvo${model.id ? '' : ', um email foi enviado com a senha'}`);
          props.onComplete(user);
        }),
        logError(true)
      );
    }
  });

  const [roles, rolesError, , retryRoles] = useRetryableObservable(() => {
    return userService.roles().pipe(logError());
  }, []);

  const handleEnter = useCallback(() => {
    formik.setValues(props.user ?? formik.initialValues, false);
  }, [formik, props.user]);

  const handleExit = useCallback(() => {
    formik.resetForm();
  }, [formik]);

  return (
    <Dialog
      open={props.opened}
      disableBackdropClick
      disableEscapeKeyDown
      onEnter={handleEnter}
      onExited={handleExit}
      TransitionComponent={Transition}
    >
      {formik.isSubmitting && <LinearProgress color='primary' />}

      <form onSubmit={formik.handleSubmit}>
        <DialogTitle>{formik.values.id ? 'Editar' : 'Novo'} Usuário</DialogTitle>
        <DialogContent className={classes.content}>
          {rolesError && <ErrorMessage error={rolesError} tryAgain={retryRoles} />}

          {!rolesError && (
            <Fragment>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField label='Nome' name='name' formik={formik} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField label='Quantidade' name='quantity' formik={formik} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField label='Descrição' name='description' formik={formik} />
                </Grid>
              </Grid>
              <FormControl component='fieldset' error={formik.touched.roles && !!formik.errors.roles}>
                {formik.touched.roles && !!formik.errors.roles && (
                  <FormHelperText>{formik.errors.roles}</FormHelperText>
                )}
              </FormControl>
            </Fragment>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={props.onCancel}>Cancelar</Button>
          <Button color='primary' variant='contained' type='submit' disabled={formik.isSubmitting || !roles}>
            Salvar
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
});

const Transition = memo(
  forwardRef((props: any, ref: any) => {
    return <Slide direction='up' {...props} ref={ref} />;
  })
);

export default FormDialog;
