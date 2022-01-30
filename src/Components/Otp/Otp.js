import React from 'react';
import OtpInput from 'react-otp-input';
import './Otp.css'
function Otp(props) {
    const [otp, setOtp] = React.useState('');
    return (
        <div className='otp'>
            <OtpInput
        value={props.val}
        onChange={(e) => props.change(e)}
        numInputs={6}
        separator={<span className="tobeblack">-</span>}
                className='otp-input'
                containerStyle={{
                    width: '100%',
                }}
                inputStyle={{
                    width: "",
                    padding: "0.3rem",
                }}
     
      />
        </div>
    );
}

export default Otp;
