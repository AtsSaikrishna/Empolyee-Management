package com.EmpolyeeManagement.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.EmpolyeeManagement.app.entity.Employee;

public interface EmployeeRepository extends JpaRepository<Employee, Long>{

}
