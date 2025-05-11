package com.eshwar.WordWave.repos;

import com.eshwar.WordWave.models.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentRepo  extends JpaRepository<Comment,Long> {
}
