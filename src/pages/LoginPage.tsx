import { useFormik } from 'formik';
import { loginSchema } from '../helper/schema';
import { login } from '../appwrite/auth';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';


const LoginPage = () => {
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: loginSchema,
        onSubmit: async (values) => {
            try {
                await login(values.email, values.password);
                toast.success('Logged in successfully');
                navigate('/');
            }
            catch {
                toast.error('Failed to login');
            }
        },
    });

    return (
        <div className='register'>
            <h1>Login</h1>
            <form onSubmit={formik.handleSubmit}>
                <div>
                    <input type="email"
                        placeholder="Email"
                        name='email'
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.errors.email && formik.touched.email ? <span>{formik.errors.email}</span> : null}
                </div>
                <div>
                    <input type="password"
                        name="password"
                        placeholder="Password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.errors.password && formik.touched.password ? <span>{formik.errors.password}</span> : null}
                </div>
                <button type="submit">Login</button>
            </form>
            <div className='links'>
                Don't have an account?&nbsp;
                <Link to="/register">Register</Link>
            </div>
        </div>
    );
};

export default LoginPage;