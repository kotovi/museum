package ru.baikal.ismu.conf.conf.controller;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import ru.baikal.ismu.conf.conf.service.MediaTypeUtils;

import javax.servlet.ServletContext;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.List;
import java.nio.file.Files;

@RestController
public class FileUploadController {
    private final Logger logger = LoggerFactory.getLogger(FileUploadController.class);

    @Value("${spring.files.uploadFolder}")
    private static String UPLOADED__FOLDER;

    //Save the uploaded file to this folder
   // private static String UPLOADED__FOLDER = "/var/web/conf/";
    private List<MultipartFile> files;

    @Autowired
    private ServletContext servletContext;

    @GetMapping(value = "/downloadFile/{fileName:.+}", produces = MediaType.APPLICATION_OCTET_STREAM_VALUE)
    public @ResponseBody
    ResponseEntity<InputStreamResource> getFile(@PathVariable String fileName) {
        System.out.println("UPLOADED__FOLDER:"  + UPLOADED__FOLDER  + "fileName: " + fileName);

        MediaType mediaType = MediaTypeUtils.getMediaTypeForFileName(this.servletContext, fileName);
        try {
            File file = new File(UPLOADED__FOLDER + fileName);
            if (file.exists()) {

                InputStreamResource resource = new InputStreamResource(new FileInputStream(file));
                return ResponseEntity.ok()
                        // Content-Disposition
                        .header(HttpHeaders.CONTENT_DISPOSITION, "attachment;filename=" + file.getName())
                        // Content-Type
                        .contentType(mediaType)
                        // Contet-Length
                        .contentLength(file.length()) //
                        .body(resource);
            } else {
                System.out.println("File is not exist!");
                return null;}
        }catch (Exception e) {
            System.out.println("I'm get exception!");
            e.printStackTrace();
            return null;
        }
    }


    //3.1.1 Single file upload
    @PostMapping("/upload")
    //If not @RestController, uncomment this
    //@ResponseBody
    public ResponseEntity<?> uploadFile(
            @RequestParam("file") MultipartFile uploadfile) {
        System.out.println("Single file upload!");
        logger.debug("Single file upload!");

        if (uploadfile.isEmpty()) {

            System.out.println("please select a file!");
            return new ResponseEntity("please select a file!", HttpStatus.OK);
        }

        try {

            saveUploadedFiles(Arrays.asList(uploadfile));

        } catch (IOException e) {
           // return new ResponseEntity<>(HttpStatus.BAD__REQUEST);
            System.out.println("Что то обеблось");
            e.printStackTrace();
        }
        System.out.println("Successfully uploaded -  uploadfile.getOriginalFilename(): " +uploadfile.getOriginalFilename());
        return new ResponseEntity("Successfully uploaded - " +
                uploadfile.getOriginalFilename(), new HttpHeaders(), HttpStatus.OK);

    }

    //save file
    private void saveUploadedFiles(List<MultipartFile> files) throws IOException {
        this.files = files;

        for (MultipartFile file : files) {

            if (file.isEmpty()) {
                continue;//next pls
            }

            byte[]bytes = file.getBytes();
            Path path = Paths.get(UPLOADED__FOLDER + file.getOriginalFilename());
            Files.write(path, bytes);

        }

    }


}
