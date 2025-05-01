import React from "react";
import { Modal, Box } from "@mui/material";
interface CustomModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  title: string;
  activeItem: string;
  component: React.ReactNode;
  setRoute: (route: string) => void;
}
const CustomModal = ({
  open,
  setOpen,
  title,
  activeItem,
  component: Component,
  setRoute,
}: CustomModalProps) => {
  // function handleClose(): void {
  //   setOpen(false);
  // }
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,

    boxShadow: 24,
    p: 4,
  };

  const handleClose = () => setOpen(false);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={style}
          className="absalute z-90  w-[450px] bg-white dark:bg-slate-900 rounded-[8px] shadow p-4 outline-none "
        >
          <h2 className="text-center text-black dark:text-white text-2xl font-bold">
            {title}
          </h2>
          <div className="mt-4 dark:text-white text-black ">{Component}</div>
        </Box>
      </Modal>
    </div>
    // <Modal
    //   open={open}
    //   onClose={handleClose}
    //   aria-labelledby="modal-modal-title"
    //   aria-describedby="modal-modal-description"
    // >
    //   <Box className="absalute z-90 top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[450px] bg-white dark:bg-slate-900 rounded-[8px] shadow p-4 outline-none ">
    //     <Typography id="modal-modal-title" variant="h6" component="h2">
    //       Text in a modal
    //     </Typography>
    //     <Typography id="modal-modal-description" sx={{ mt: 2 }}>
    //       Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
    //     </Typography>
    //   </Box>
    // </Modal>
    // <Modal
    //   open={open}
    //   onClose={() => setOpen(false)}
    //   aria-labelledby="modal-modal-title"
    //   aria-describedby="modal-modal-description"
    // >
    //   <Box
    //     sx={{
    //       position: "absolute",
    //       top: "50%",
    //       left: "50%",
    //       transform: "translate(-50%, -50%)",
    //       width: 400,
    //       bgcolor: "background.paper",
    //       boxShadow: 24,
    //       p: 4,
    //     }}
    //     className="absalute z-90 top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[450px] bg-white dark:bg-slate-900 rounded-[8px] shadow p-4 outline-none "
    //   >
    //     <h2 className="text-center text-2xl font-bold">{title}</h2>
    //     <div className="mt-4 ">{Component}</div>
    //   </Box>
    // </Modal>
  );
};
export default CustomModal;
