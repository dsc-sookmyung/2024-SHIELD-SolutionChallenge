package shield.shieldbackend.controller;

import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import shield.shieldbackend.dto.ReportDto;
import shield.shieldbackend.dto.ReportFixedDto;
import shield.shieldbackend.entity.Report;
import shield.shieldbackend.service.ReportService;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class ReportController {
    private final ReportService reportService;

    // 보고서 작성 페이지에서 보여주는 것들
    @GetMapping("api/reports/create")
    public ReportFixedDto getFixedData(HttpSession session) {
        Long MemberId = (Long) session.getAttribute("MemberId");
        return reportService.getFixedData(MemberId);
    }

    // 보고서 작성
    @PostMapping("api/reports/create")
    public ResponseEntity<String> createReport(@RequestBody ReportDto reportDto, HttpSession session) {
        try {
            Long MemberId = (Long) session.getAttribute("MemberId");
            if (MemberId == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Member not logged in.");
            }
            reportDto.setMemberId(MemberId);

            reportService.createReport(reportDto, MemberId);
            return ResponseEntity.status(HttpStatus.CREATED).body("Report created successfully!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to create report.");
        }
    }

    // 보고서 목록
    @GetMapping("/api/reports")
    public ResponseEntity<List<Report>> getAllReports() {
        List<Report> reportList = reportService.getAllReports();
        return ResponseEntity.ok(reportList);
    }

    // 보고서 수정
    @PutMapping("/api/reports/{reportId}")
    public ResponseEntity<String> updateReport(@PathVariable Long reportId, @RequestBody ReportDto updateReportDto) {
        try {
            reportService.updateReport(reportId,updateReportDto);
            return ResponseEntity.ok("Report updated successfully!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to updated report.");
        }
    }
}
