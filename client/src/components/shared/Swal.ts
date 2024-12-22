import Swal from 'sweetalert2';

export const showSwal = (
  title: string,
  icon: 'success' | 'error' | 'warning' | 'info' = 'success',
  timer: number = 1500
) => {
  Swal.fire({
    icon: icon,
    title: title,
    showConfirmButton: false,
    timer: timer,
    customClass: {
      title: 'custom-swal-title',
    },
  });
};
