package shield.shieldbackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import shield.shieldbackend.entity.Fire;

public interface FireRepository extends JpaRepository<Fire, Long> {
    Fire findByCamNum(String camNum);
}
