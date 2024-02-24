package shield.shieldbackend.domain;

// 요소: 서버 아이디, 이름, 사용자 지정 아이디, 비밀번호, 비밀번호 확인, 소속, 휴대폰 번호


import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import shield.shieldbackend.dto.MemberJoinDto;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "member_table")
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberId;

    private String name;
    private String userId;
    private String password;
    private String passwordCheck;
    private String department;
    private String area;
    private String phoneNo;

    public Member(String name, String userId, String password, String passwordCheck, String department, String area, String phoneNo) {
        this.name = name;
        this.userId = userId;
        this.password = password;
        this.passwordCheck = passwordCheck;
        this.department = department;
        this.area = area;
        this.phoneNo = phoneNo;
    }

    public static Member from(MemberJoinDto dto){
        return new Member(
                dto.getName(),
                dto.getUserId(),
                dto.getPassword(),
                dto.getPasswordCheck(),
                dto.getDepartment(),
                dto.getArea(),
                dto.getPhoneNo()
        );
    }


}
