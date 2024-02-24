package shield.shieldbackend.service;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import shield.shieldbackend.domain.Member;
import shield.shieldbackend.dto.MemberJoinDto;
import shield.shieldbackend.dto.MemberLoginDto;
import shield.shieldbackend.dto.MyPageDto;
import shield.shieldbackend.repository.MemberRepository;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;

    /**
     * 회원가입
     */
    public MemberJoinDto join(MemberJoinDto dto, HttpServletRequest request) throws Exception {
        HttpSession session = request.getSession();

        // else if 에서 false(아이디 중복)의 경우 예외 발생
        if (session.getAttribute("idDuplicate") == null) {
            throw new Exception("ID duplication verification is required");
        } else if (!Objects.equals(dto.getPassword(), dto.getPasswordCheck())) {
            throw new Exception("Not Equal Password");
        } else if (!((boolean) session.getAttribute("idDuplicate"))) {
            throw new Exception("Duplicated ID");
        }

        return MemberJoinDto.from(memberRepository.save(Member.from(dto)));
    }

    /**
     * 아이디 중복 검사
     */
    public Boolean checkId(MemberJoinDto dto) {
        if (memberRepository.existsByUserId(dto.getUserId())) {
            System.out.println("아이디 중복 확인 - checkId");
            return false;
        }
        return true;
    }

    public Long login(MemberLoginDto dto, HttpServletRequest request) {
        Member member = memberRepository.findByUserId(dto.getUserId());
        // 세션에서 사용자 아이디 가져오기
        HttpSession session = request.getSession();

        if (member != null && member.getPassword().equals(dto.getPassword())) {
            return member.getMemberId();
        }

        return null;
    }

    // 마이페이지 유저 정보 불러오기
    public MyPageDto findUserInfo(HttpServletRequest request) {
        // 세션에서 사용자 아이디 가져오기
        HttpSession session = request.getSession();
        System.out.println("MemberId from Session: " + session);

        Long MemberId = (Long) session.getAttribute("MemberId");

        // 아이디로 회원 정보 조회
        if (MemberId == null) {
            return null;    // 세션에 사용자 아이디가 없는 경우 null 반환
        }

        Member member = memberRepository.findByMemberId(MemberId);

        if (member == null) {
            System.out.println("User not found with user MemberId: " + MemberId);
            return null;
        }

        return new MyPageDto(member);
    }

    public List<Member> findMembers() {
        return memberRepository.findAll();
    }

}
