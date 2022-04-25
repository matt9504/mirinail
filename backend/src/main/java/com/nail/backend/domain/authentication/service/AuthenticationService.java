package com.nail.backend.domain.authentication.service;


import com.nail.backend.domain.authentication.db.entity.DesignerApplication;
import com.nail.backend.domain.authentication.request.ArtistRegisterPostReq;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface AuthenticationService {
    DesignerApplication artistRegister(ArtistRegisterPostReq artistRegisterPostReq,
                                       MultipartFile registrationFile, MultipartFile portfolioFile,
                                       String userId) throws IOException;
}