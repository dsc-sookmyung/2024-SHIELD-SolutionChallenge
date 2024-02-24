package shield.shieldbackend.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.net.URL;

@Getter
@Setter
@NoArgsConstructor
public class FireDto {
    private String fireTime;
    private String firePlace;

    public FireDto(String fireTime, String firePlace) {
        this.fireTime = fireTime;
        this.firePlace = firePlace;
    }

}
