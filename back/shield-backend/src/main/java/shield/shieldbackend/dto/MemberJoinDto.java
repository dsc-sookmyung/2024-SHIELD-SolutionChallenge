package shield.shieldbackend.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import shield.shieldbackend.domain.Member;

@Getter
@NoArgsConstructor
public class MemberJoinDto {

    private String name;
    private String userId;
    private String password;
    private String passwordCheck;
    private String department;
    private String area;
    private String phoneNo;

    public MemberJoinDto(String name, String userId, String password, String passwordCheck, String department, String area, String phoneNo) {
        this.name = name;
        this.userId = userId;
        this.password = password;
        this.passwordCheck = passwordCheck;
        this.department = department;
        this.area = area;
        this.phoneNo = phoneNo;
    }

    public static MemberJoinDto from(Member member){
        return new MemberJoinDto(
                member.getName(),
                member.getUserId(),
                member.getPassword(),
                member.getPasswordCheck(),
                member.getDepartment(),
                member.getArea(),
                member.getPhoneNo()
        );
    }    
    
}
