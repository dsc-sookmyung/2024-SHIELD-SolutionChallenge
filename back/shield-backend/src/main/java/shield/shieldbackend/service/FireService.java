package shield.shieldbackend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import shield.shieldbackend.dto.FireDto;
import shield.shieldbackend.entity.Fire;
import shield.shieldbackend.repository.FireRepository;


@Service
@RequiredArgsConstructor
public class FireService {
    private final FireRepository fireRepository;

    // cam1 파일 처리
    public void processCam1File(String fileName) {
        updateOrAddFire(fileName);
    }

    // cam2 파일 처리
    public void processCam2File(String fileName) {
        updateOrAddFire(fileName);
    }

    // Fire 데이터 업데이트 또는 추가
    private void updateOrAddFire(String fileName) {
        String[] parts = fileName.split("_");
        String camNum = parts[0];

        Fire existingFire = fireRepository.findByCamNum(camNum);
        if (existingFire != null) {
            updateFire(fileName);
        } else {
            addFire(fileName);
        }
    }

    // Fire 데이터 업데이트
    private void updateFire(String fileName) {
        String[] parts = fileName.split("_");
        String camNum = parts[0];

        Fire fire = fireRepository.findByCamNum(camNum);

        String fireDate = parts[1];
        String fireTime = parts[2];
        String truth = parts[3];
        String firePossibility = parts[4].split("\\.")[0];
        String firePlace;
        if (camNum.equals("cam1")) firePlace = "효창공원";
        else if (camNum.equals("cam2")) firePlace = "남산 공원";
        else firePlace = "";

        fire.setCamNum(camNum);
        fire.setFireDate(fireDate);
        fire.setFireTime(fireTime);
        fire.setTruth(truth);
        fire.setFirePossibility(firePossibility);
        fire.setFirePlace(firePlace);

        fireRepository.save(fire);


    }

    // Fire 데이터 추가
    private void addFire(String fileName) {
        String[] parts = fileName.split("_");
        String camNum = parts[0];
        String fireDate = parts[1];
        String fireTime = parts[2];
        String truth = parts[3];
        String firePossibility = parts[4].split("\\.")[0];
        String firePlace;
        if (camNum.equals("cam1")) firePlace = "효창공원";
        else if (camNum.equals("cam2")) firePlace = "남산공원";
        else firePlace = "";

        Fire fire = new Fire();
        fire.setCamNum(camNum);
        fire.setFireDate(fireDate);
        fire.setFireTime(fireTime);
        fire.setTruth(truth);
        fire.setFirePossibility(firePossibility);
        fire.setFirePlace(firePlace);

        fireRepository.save(fire);
    }

    public FireDto getFireData(String camNum) {
        Fire fire = fireRepository.findByCamNum(camNum);
        // truth == "FALSE"인 경우
        if (!"TRUE".equals(fire.getTruth())) {
            return null;
        }
        // truth == "TRUE"인 경우
        return new FireDto(fire.getFireTime(), fire.getFirePlace());
    }

}
