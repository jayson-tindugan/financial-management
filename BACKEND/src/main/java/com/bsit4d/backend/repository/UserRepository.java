package com.bsit4d.backend.repository;


import com.bsit4d.backend.model.UserModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserModel,Long> {

    @Query(value= "select * from users where idNumber = ?1", nativeQuery = true)
    Optional<UserModel> findByIdNumber(Long idNumber);
//    @Query(value = "SELECT * FROM subjects WHERE idNumber=:idNumber",nativeQuery = true)
//    ArrayList<UserModel> findAllUsers(Long idNumber);

    List<UserModel> findByRole(String role);
    Long countByRoleIsNotAndStatus(String role, String status);
    boolean existsByIdNumber(Long idNumber);
}
