import { register } from '../appwrite/auth';
import { useFormik } from 'formik';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { registerSchema } from '../helper/schema';

const App = () => {
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
        },
        validationSchema: registerSchema,
        onSubmit: async (values) => {
            try {
                await register(values.email, values.password, values.name);
                toast.success('Registered successfully');
                navigate('/');
            }
            catch {
                toast.error('Failed to register');
            }
        },
    });

    return (
        <div className='register'>
            <h1>Register</h1>
            <form onSubmit={formik.handleSubmit}>
                <div>
                    <input type="text"
                        placeholder="Name"
                        name='name'
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.errors.name && formik.touched.name ? <span>{formik.errors.name}</span> : null}
                </div>
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
                <button type="submit">Register</button>
            </form>
            <div className='links'>
                Already have an account?&nbsp;
                <Link to="/login">Login</Link>
            </div>
        </div>
    );
};

export default App;
