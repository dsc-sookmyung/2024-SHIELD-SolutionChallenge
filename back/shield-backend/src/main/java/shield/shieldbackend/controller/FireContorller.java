package shield.shieldbackend.controller;

import software.amazon.awssdk.regions.Region;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import shield.shieldbackend.dto.FireDto;
import shield.shieldbackend.service.FireService;
import shield.shieldbackend.service.EC2Service;
import software.amazon.awssdk.services.s3.S3Client;

import java.net.URL;

@RestController
@RequiredArgsConstructor
public class FireContorller {
    private final FireService fireService;
    private final EC2Service EC2Service;


//    @GetMapping("api/fire-Info/{camNum}")
//    public FireDto getFireData(@PathVariable String camNum) {
//        return fireService.getFireData(camNum);
//    }

    // cam1 화재 페이지
    @GetMapping("api/fire-Info/cam1")
    public ResponseEntity<URL> showCam1Image() {
//        String fileName;
//        if (camNum.equals("cam1")) {
//            fileName = EC2Service.getLatestImageFileNameCam1();
//        else{
//            fileName = EC2Service.getLatestImageFileNameCam2();
//        }

        String fileName = EC2Service.getLatestImageFileNameCam1();

        String bucketName = "2024-gdsc-fire";
        String keyName = "afterML/" + fileName;

        Region region = Region.AP_NORTHEAST_2;
        S3Client s3 = S3Client.builder()
                .region(region)
                .build();
        URL imageUrl = EC2Service.getURL(s3, bucketName, keyName);
        s3.close();

        return ResponseEntity.ok(imageUrl);

    }

    @GetMapping("api/fire-Info/cam2")
    public ResponseEntity<URL> showCam2Image() {
        String fileName = EC2Service.getLatestImageFileNameCam2();

        String bucketName = "2024-gdsc-fire";
        String keyName = "afterML/" + fileName;

        Region region = Region.AP_NORTHEAST_2;
        S3Client s3 = S3Client.builder()
                .region(region)
                .build();
        URL imageUrl = EC2Service.getURL(s3, bucketName, keyName);
        s3.close();

        return ResponseEntity.ok(imageUrl);

    }


//    @GetMapping("api/fire-Info/{camNum}")
//    public FireInfoResponse showImageAndFireData(@PathVariable String camNum) {
//        String fileName;
//        if (camNum.equals("cam1")) {
//            fileName = EC2Service.getLatestImageFileNameCam1();
//            // if (fileName != null) fireService.processCam1File(fileName);
//        }
//        else{
//            fileName = EC2Service.getLatestImageFileNameCam2();
//            // if (fileName != null) fireService.processCam2File(fileName);
//        }
//
//        String bucketName = "2024-gdsc-fire";
//        String keyName = fileName;
//
//        Region region = Region.AP_NORTHEAST_2;
//        S3Client s3 = S3Client.builder()
//                .region(region)
//                .build();
//        URL imageUrl = EC2Service.getURL(s3, bucketName, keyName);
//        s3.close();
//
//        String urlToString = imageUrl.toString();
//
//        return fireService.getFireData(camNum);
//
//    }

    // 지도 페이지 (페이지 로드했을 때 화재 정보 저장 위함)
    @GetMapping("api/fire-Info")
    public ResponseEntity<String> saveFireData() {
        String cam1FileName = EC2Service.getLatestImageFileNameCam1();
        String cam2FileName = EC2Service.getLatestImageFileNameCam2();

        fireService.processCam1File(cam1FileName);
        fireService.processCam2File(cam2FileName);

        return ResponseEntity.ok("Success! Fire Information is updated.");
    }
}
