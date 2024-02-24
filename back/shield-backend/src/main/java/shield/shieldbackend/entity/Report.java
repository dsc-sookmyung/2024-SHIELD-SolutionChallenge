package shield.shieldbackend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import shield.shieldbackend.domain.Member;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "report_table")
public class Report extends ReportBase{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "report_id")
    private Long id; // PK

    @OneToOne
    @JoinColumn(name = "fire_id", updatable = false)
    private Fire fire;

    @ManyToOne(cascade = CascadeType.MERGE, targetEntity = Member.class)
    @JoinColumn(name = "member_id", updatable = false)
    private Member member;

    // 발생 개요
    @Column
    private String reportFireDate; // 리포트 테이블에 저장될(축적될) 화재 발생 날짜
    @Column
    private String reportFireTime; // 리포트 테이블에 저장될(축적될) 화재 발생 시간
    @Column
    private String reportFireTime; // 리포트 테이블에 저장될(축적될) 화재 발생 시간
    @Column
    private String reportFirePlace; // 리포트 테이블에 저장될(축적될) 화재 발생 장소
    @Column
    private String cause; // 원인

    // 피해 상황
    @Column
    private Integer deathNum; // 사망자 수
    @Column
    private Integer injuryNum; // 부상자 수
    @Column
    private String theDead; // 사망자 명단
    @Column
    private String theInjured; // 부상자 명단
    @Column
    private Double money; // 재산 피해

    // 동원 상황
    @Column
    private Integer workerNum; // 인원수
    @Column
    private Integer equipNum; // 장비 수

    // 조치 사항
    @Column
    private String action; // 조치사항
}
