import './UserLogin.css';
import { useState } from 'react';
import userService from '../../services/common/user.service';

import { Hourglass } from "react-loader-spinner";
import http from '../../helpers/http';
import useShowMessage from '../../helpers/Hooks/useShowMessage';
import { stringify } from '../../helpers/functions/textFunctions';
import { useDispatch } from 'react-redux';
import { setUser } from '../../helpers/slices/userSlice';

function UserLogin() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errors, setErrors] = useState({ email: '', password: '' })
  const [verifyStatus, setVerifyStatus] = useState(false)
  const [verifybutton, setVerifybutton] = useState(false)
  const [loader, setLoader] = useState(false);
  const message = useShowMessage()
  const dispatch = useDispatch()

  const validateEmailAddress = (emailAddress) => {
    var atSymbol = emailAddress.indexOf("@");
    var dotSymbol = emailAddress.lastIndexOf(".");
    var spaceSymbol = emailAddress.indexOf(" ");

    if ((atSymbol != -1) &&
      (atSymbol != 0) &&
      (dotSymbol != -1) &&
      (dotSymbol != 0) &&
      (dotSymbol > atSymbol + 1) &&
      (emailAddress.length > dotSymbol + 1) &&
      (spaceSymbol == -1)) {
      return true;
    } else {
      return false;
    }
  }

  const verify = () => {
    http.post(`/users/verify-email?email=${email}`)
      .then(res => {
        setVerifyStatus(true)
      }).catch(e => {
        message({ status: "error", error: e })
      })
  }

  const validatePhoneNumber = (inputtxt) => {
    return true;
    var phoneno = /^\d{10}$/;
    if (inputtxt.value.match(phoneno)) {
      return true;
    }
    else {
      alert("message");
      return false;
    }
  }

  const validate = (name, value, label) => {
    if (value === '') {
      setErrors({ ...errors, [name]: label + " is required" })
    } else {
      setErrors({ ...errors, [name]: '' });
    }
  }

  const login = (e) => {
    e.preventDefault();
    setLoader(true);
    setErrors({ loginError: '' });

    let error = false;
    const rerrors = {};


    if (email.length == 0) {
      rerrors['email'] = 'Email is required';
      error = true;
    } else if (!validateEmailAddress(email)) {
      rerrors['email'] = 'Please enter valid Email';
      error = true;
    }

    if (password.length == 0) {
      rerrors['password'] = 'Password is required';
      error = true;
    }


    if (!error) {

      userService.login({ email, password })
        .then(response => {
          dispatch(setUser(response.data))
          setLoader(false)
          localStorage.setItem("isSignedIn", stringify(true))
          localStorage.setItem('user_id', response.data._id);
          localStorage.setItem('fullname', response.data.first_name + " " + response.data.last_name)
          localStorage.setItem('role', response.data.role)
          if (response.data.role === 'employer') {
            localStorage.setItem('job_credits', response.data.job_credits);
            localStorage.setItem('ad_credits', response.data.ad_credits);
            localStorage.setItem('landing_page_ad_days', response.data.landing_page_ad_days);
            localStorage.setItem('banner_ad_days', response.data.banner_ad_days);
            localStorage.setItem('usedFreeJobCredit', response.data.usedFreeJobCredit);
            localStorage.setItem('usedFreeAdCredit', response.data.usedFreeAdCredit);
            message({ path: "/company" })
          } else if (response.data.role === 'user') {
            window.location.reload()
          } else {
            window.location.href = `/${response.data.role}`
          }

        })
        .catch(e => {
          console.log(e);

          if (e && e.code) {
            if (e.response && e.response.data) {
              if (e.response.data.email) {
                setErrors({ loginError: e.response.data.email });
              }

              if (e.response.data.message) {
                if (e.response.data.message === 'User Not Activated') {
                  setEmail(email)
                  setVerifyStatus(true)
                }
                setErrors({ loginError: e.response.data.message });
              }
            } else {
              setErrors({ loginError: e.message });
            }
          }
          setTimeout(() => { setLoader(false); window.scrollTo({ top: 10, behavior: "smooth" }); }, 1200)
        });

    } else {
      setLoader(false);
      window.scrollTo({ top: 10, behavior: "smooth" });
      setErrors(rerrors);
    }

  }

  return (
    <>
      <div class="row">
        <div class="col-12">
          {errors && errors.loginError && <div class="alert alert-danger" role="alert">
            {errors && errors.loginError}</div>}

          {verifybutton && <div class="alert alert-danger" role="alert">
            Email sent to your Address</div>}

          <form onSubmit={(e) => { login(e) }}>

            <div class="form-outline mb-4">

              <label class="form-label" for="form3Example3">Email address</label>
              <input type="email" class="form-control form-control-lg"
                value={email} onChange={(event) => { validate('email', event.target.value, 'Email'); setEmail(event.target.value) }} required id="email" placeholder="Email" />
              <span class="">{errors && errors.email}</span>
            </div>

            <div class="form-outline mb-3">

              <label class="form-label" for="form3Example4">Password</label>
              <input type="password" id="password" name="password" value={password} onChange={(event) => { validate('password', event.target.value, 'Password'); setPassword(event.target.value) }} required placeholder="Password" class="form-control form-control-lg"
              />
              <span class="">{errors && errors.password}</span>
            </div>

            <div class="d-flex justify-content-between align-items-center">
              <div class="form-check mb-0">
                <button type="submit" class="btn btn-primary btn-lg"
                  style={{ "paddingLeft": "2.5rem", "paddingRight": "2.5rem" }}>Login</button>
              </div>
              {verifyStatus && <div class="form-check mb-0">
                <button type="button" onClick={() => verify()} class="btn btn-primary btn-lg"
                  style={{ "paddingLeft": "2.5rem", "paddingRight": "2.5rem" }}>Verify</button>
              </div>}
              <a href="/forgotPassword" class="text-body">Forgot password?</a>
            </div>


          </form>
        </div>
      </div>
      <Hourglass
        visible={loader}
        height="80"
        width="80"
        ariaLabel="hourglass-loading"
        wrapperStyle={{ position: 'absolute', top: '80%', left: '50%' }}
        wrapperClass=""
        colors={['#0ea2bd', '#72a1ed']}
      />
    </>
  );
}

export default UserLogin;
