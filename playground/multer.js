

const upload = multer({
    dest: "public/images",
    limits: {
      fileSize: 1000000, // 1 mb
    },
    fileFilter(req, file, cb) {
      // cb(new Error("File must be a PDF"));
      // cb(null, true); // there is no error and accept
      // cb(null, false); // there is no error and reject
  
      if (!file.originalname.match(/.(doc|docx)$/)) {
        return cb(new Error("Please upload a word document"));
      }
      cb(null, true);
    },
  });
  