package shield.shieldbackend.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import shield.shieldbackend.domain.Member;

@Getter
@Setter
@NoArgsConstructor
public class MyPageDto {
    private String name;
    private String userId;
    private String password;
    private String department;
    private String area;
    private String phoneNo;

    public MyPageDto(Member member) {
        this.name = member.getName();
        this.userId = member.getUserId();
        this.password = member.getPassword();
        this.department = member.getDepartment();
        this.area = member.getArea();
        this.phoneNo = member.getPhoneNo();
    }
}
