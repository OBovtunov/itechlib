import Head from "next/head";
import { useRouter } from "next/router";
import { PropTypes } from "prop-types";
import { Box, Container, Grid, Button, Typography } from "@mui/material";
import BookDetails from "../../../components/book/book-details";
import BookCoverImage from "../../../components/book/book-cover-image";
import HiddenBookCoverTools from "../../../components/book/book-cover-image/hidden-book-cover-tools";
import { DashboardLayout } from "../../../components/dashboard-layout";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useState, useEffect } from "react";
import { BooksAPI } from "../../../api/books-api";
import { useBoolean } from "./../../../utils/boolean-hook";
import SelectImageModal from "../../../components/book/book-cover-image/select-image-modal";
import { useCustomSnackbar } from "./../../../utils/custom-snackbar-hook";
import styles from "./BookPreviewPage.module.css";

function BookPreviewPage({ isAssigned, assignHandler }) {
   const router = useRouter();
   const id = router.query.id;
   const [book, setBook] = useState([]);
   const [isLoaded, setIsLoaded] = useState(false);
   const [isOwner, setIsOwner] = useState(false);
   const [selectedImage, setSelectedImage] = useState(null);
   const [isUploadedBookCover, setIsUploadedBookCover] = useState(false);
   const [isUrlBookCover, setIsUrlBookCover] = useState(null);
   const [isAllowedImage, setIsAllowedImage] = useState(false);
   const [visible, setVisible, setHidden] = useBoolean();
   const [enqueueSnackbar, defaultErrorSnackbar] = useCustomSnackbar();
   const [
      isUploadButtonOpen,
      setUploadButtonOpen,
      setUploadButtonClose,
   ] = useBoolean();

   const imageUploadHandler = () => {
      const file = new FormData();
      file.append("bookId", id);
      file.append("file", selectedImage);

      BooksAPI.addBookCover(file)
         .then(() => {
            onCloseHandler();
            setIsUploadedBookCover(true);
         })
         .catch(() => {
            defaultErrorSnackbar();
         });
   };

   const imageSelectedHandler = (e) => {
      const imgFile = e.target.files[0];
      if (imgFile) {
         if (imgFile.size > 500000) {
            setIsUrlBookCover(null);
            setIsAllowedImage(true);
            return;
         } else {
            let urlImg = URL.createObjectURL(imgFile);
            setIsUrlBookCover(urlImg);
            setIsAllowedImage(false);
            setSelectedImage(imgFile);
         }
      }
   };

   const onCloseHandler = () => {
      setUploadButtonClose();
      setIsUrlBookCover(null);
      setIsAllowedImage(false);
   };

   useEffect(() => {
      const corpEmail = localStorage.getItem("corpEmail");
      if (router.isReady) {
         BooksAPI.getBookInfo(id)
            .then((res) => {
               if (res.data.owner.corpEmail === corpEmail) {
                  setIsOwner(true);
               } else {
                  setIsOwner(false);
               }
               res.data.reader ? assignHandler(true) : assignHandler(false);
               setBook(res.data);
               setIsLoaded(true);
               const bookCover = res.data.fileInfo;
               if (bookCover) {
                  setIsUploadedBookCover(true);
               }
            })
            .catch(() => {
               defaultErrorSnackbar();
            });
      }
   }, [
      isAssigned,
      assignHandler,
      enqueueSnackbar,
      id,
      router.isReady,
      defaultErrorSnackbar,
      isUploadedBookCover,
   ]);

   if (!isLoaded) {
      return (
         <Typography sx={{ my: 8, mx: 4 }} variant="h4">
            Loading...
         </Typography>
      );
   } else {
      return (
         <>
            <SelectImageModal
               open={isUploadButtonOpen}
               onClose={onCloseHandler}
               onSelect={imageSelectedHandler}
               urlBookCover={isUrlBookCover}
               isAllowedImage={isAllowedImage}
               onUpload={imageUploadHandler}
            />

            <Head>
               <title>Book preview page</title>
            </Head>
            <Box
               component="main"
               sx={{
                  flexGrow: 1,
                  pt: 3,
                  pb: 8,
               }}
            >
               <Button
                  onClick={() => router.back()}
                  component="a"
                  startIcon={<ArrowBackIcon fontSize="small" />}
                  sx={{
                     ml: 2,
                  }}
               >
                  Back
               </Button>
               <Container
                  maxWidth="lg"
                  sx={{
                     pt: 11,
                  }}
               >
                  <Grid container spacing={12}>
                     <Grid item lg={4} md={4} xs={12}>
                        <div
                           className={styles.bookCoverImage}
                           onMouseEnter={setVisible}
                           onMouseLeave={setHidden}
                        >
                           <BookCoverImage
                              book={book}
                              isOwner={isOwner}
                              isUploaded={isUploadedBookCover}
                              onUploadButtonOpen={setUploadButtonOpen}
                           />
                           <HiddenBookCoverTools
                              visible={visible}
                              isUploaded={isUploadedBookCover}
                              onUploadButtonOpen={setUploadButtonOpen}
                           />
                        </div>
                     </Grid>
                     <Grid item lg={8} md={8} xs={12}>
                        <BookDetails
                           onUpdate={setBook}
                           book={book}
                           isAssigned={isAssigned}
                           assignHandler={assignHandler}
                           isOwner={isOwner}
                        />
                     </Grid>
                  </Grid>
               </Container>
            </Box>
         </>
      );
   }
}

BookPreviewPage.getLayout = (page) => {
   return <DashboardLayout>{page}</DashboardLayout>;
};

BookPreviewPage.propTypes = {
   isAssigned: PropTypes.bool,
   assignHandler: PropTypes.func,
};

export default BookPreviewPage;