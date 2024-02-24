package shield.shieldbackend.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;

import shield.shieldbackend.domain.Member;
import shield.shieldbackend.dto.MemberJoinDto;
import shield.shieldbackend.dto.MemberLoginDto;
import shield.shieldbackend.dto.MyPageDto;
import shield.shieldbackend.repository.MemberRepository;
import shield.shieldbackend.service.MemberService;

@RestController
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;
    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private HttpSession httpSession;

    /**
     * 회원가입
     */
    @CrossOrigin(origins = "http://localhost:5173")
    @PostMapping("/api/join")
    public ResponseEntity<MemberJoinDto> join(@RequestBody MemberJoinDto dto, HttpServletRequest request) throws Exception {
        // 아이디 중복 여부, 비밀번호 일치 여부 확인 후 회원가입
        MemberJoinDto res = memberService.join(dto, request);

        return ResponseEntity.ok(res);

    }

    /**
     * 아이디 중복확인
     * 프론트에서 해당 아이디 중복 체크 버튼을 누를 때 /api/check/id?userId=userId(검사하려는 id) 형식으로 보내주시면 됩니다.
     * 중복이 아니라면 Boolean 값인   1(true)  중복이라면   0(false)로 결과값을 반환.
     * 결과 값으로 받은 0과1로 프론트에서 중복 검사 결과 처리.
     */
    @PostMapping("/api/check/id")
    public ResponseEntity<Boolean> checkId(@RequestBody MemberJoinDto dto) {
        String userId = dto.getUserId();

        Boolean res = memberService.checkId(dto);

        // 이전 세션 제거
        httpSession.invalidate();

        // 아이디 중복 여부를 HTTP 세션에 저장(아이디가 존재하는 경우(아이디 중복) false, 존재하지 않는 경우 true)
        httpSession.setAttribute("idDuplicate", res);

        // 디버깅용 콘솔 출력
        System.out.println("ID 중복 여부: " + httpSession.getAttribute("idDuplicate"));
        System.out.println("res: " + res);

        return ResponseEntity.ok(res);
    }

    /**
     * 로그인
     * MemberLoginDto로 받은 userId와 password를 가지고 해당 아이디, 비밀번호가 있는지 확인 후
     * 없으면 null,  있으면 해당 member의 id 반환.
     */
    @PostMapping("/api")
    public ResponseEntity<Long> login(@RequestBody MemberLoginDto dto, HttpServletRequest request) {
        Long res = memberService.login(dto, request);

        httpSession.invalidate();

        // 로그인 성공 시 세션에 아이디 저장
        httpSession.setAttribute("MemberId", res);

        // 디버깅용 세션 확인 코드
        System.out.println("MemberId: " + httpSession.getAttribute("MemberId"));
        System.out.println("res: " + res);

        return ResponseEntity.ok(res);
    }

    /*
     * 마이페이지
     */
    @PostMapping("/api/mypage")
    public ResponseEntity<MyPageDto> getUserInfo(HttpServletRequest request) {
        MyPageDto myPageDto = memberService.findUserInfo(request);

        if (myPageDto == null) {
            return ResponseEntity.notFound().build();    // 사용자 없는 경우 404
        }

        return ResponseEntity.ok(myPageDto);
    }

    /*
     * public ResponseEntity<Member> getUserInfo() {
        // 세션에서 사용자 아이디 가져오기
        Long userId = (Long) httpSession.getAttribute("userId");

        if (userId != null) {
            Member member = memberRepository.findByUserId(userId.toString());
            if (member != null) {
                return ResponseEntity.ok(member);
            }
        }
        return ResponseEntity.notFound().build();
    * }
    */

    /*
     * MyPageDto userId = (MyPageDto) httpSession.getAttribute("userId");

     * Member res = memberService.getUserInfo(userId);
     * return ResponseEntity.ok(res);
     */
}
