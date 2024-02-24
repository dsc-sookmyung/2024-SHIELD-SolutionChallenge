package shield.shieldbackend.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import shield.shieldbackend.entity.Report;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class ReportDto {
    private Long fireId; // fire_table PK
    private Long memberId; // member_table PK

    // report_table
    // 발생 개요
    private String reportFireDate; // 화재 발생 날짜
    private String reportFireTime; // 화재 발생 시각
    private String reportFirePlace;
    private String cause; // 원인

    // 피해 상황
    private Integer deathNum; // 사망자 수
    private Integer injuryNum; // 부상자 수
    private String theDead; // 사망자 명단
    private String theInjured; // 부상자 명단
    private Double money; // 재산 피해

    // 동원 상황
    private Integer workerNum; // 인원수
    private Integer equipNum; // 장비 수

    private String action; // 조치 사항

    // ReportBase Entity
    private LocalDateTime reportCreatedTime; // 작성시간
    private LocalDateTime reportUpdatedTime; // 수정시간

}
