package shield.shieldbackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import shield.shieldbackend.entity.Report;

public interface ReportRepository extends JpaRepository<Report, Long> {
}
