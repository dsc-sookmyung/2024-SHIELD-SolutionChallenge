package shield.shieldbackend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.net.URL;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table (name = "fire_table")
public class Fire {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "fire_id")
    private Long id;

    // ML에서 넘겨받을 때 파일명을 분리할 예정이라 String이 편할 것이라 판단.
    @Column
    private String camNum; // 캠 이름
    @Column
    private String fireDate; // 화재 발생 날짜
    @Column
    private String fireTime; // 화재 발생 시각
    @Column
    private String firePlace; // 화재 발생 장소
    @Column
    private String truth; // 화재 발생 여부
    @Column
    private String firePossibility; // 화재일 확률
}
