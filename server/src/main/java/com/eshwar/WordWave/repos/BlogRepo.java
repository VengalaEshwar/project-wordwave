package com.eshwar.WordWave.repos;

import com.eshwar.WordWave.models.Blog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BlogRepo extends JpaRepository<Blog,Long> {
}
