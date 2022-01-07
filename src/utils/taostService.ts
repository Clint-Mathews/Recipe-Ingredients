import { toast } from 'react-toastify';

export const ToastType = {
    Error:1,
    Success:2,
    Info:3,
}

interface IToast {
  text: string,
  toastType: number
}

const toastService = ({text,toastType} : IToast) =>{
  switch( toastType ){
    case ToastType.Success: toast.success(text, {
position: "top-right",
autoClose: 2000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: false,
draggable: true,
progress: undefined,
});
      break;
          case ToastType.Error:
            toast.error(text, {
position: "top-right",
autoClose: 2000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: false,
draggable: true,
progress: undefined,
});
      break;
          case ToastType.Info:
            toast.info(text, {
position: "top-right",
autoClose: 2000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: false,
draggable: true,
progress: undefined,
});
      break;
      default: break;
  }

}
export default toastService