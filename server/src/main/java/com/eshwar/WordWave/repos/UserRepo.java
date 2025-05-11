package com.eshwar.WordWave.repos;

import com.eshwar.WordWave.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepo extends JpaRepository<User,Long> {
    public User findByUsername(String name);
}
