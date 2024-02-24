package shield.shieldbackend.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ReportFixedDto {
    private String name; // 작성자 이름
    private String department; // 관할 소방서

    public ReportFixedDto(String name, String department) {
        this.name = name;
        this.department = department;
    }
}
