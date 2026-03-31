package com.hirevia.service.Impl;

import com.hirevia.enums.BusinessType;
import com.hirevia.enums.Industry;
import com.hirevia.exceptions.InvalidDataException;
import com.hirevia.exceptions.NotFoundException;
import com.hirevia.models.Company;
import com.hirevia.repositories.CompanyRepository;
import com.hirevia.service.CompanyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CompanyServiceImpl implements CompanyService {

    @Autowired
    private CompanyRepository companyRepository;

    @Override
    public Company createCompany(Company company) {
        if (company.getName() == null || company.getName().trim().isEmpty()) {
            throw new InvalidDataException("Company name is required!");
        }

        if (company.getDescription() == null || company.getDescription().trim().isEmpty()) {
            throw new InvalidDataException("Company description is required!");
        }

        if (company.getLocation() == null || company.getLocation().trim().isEmpty()) {
            throw new InvalidDataException("Company location is required!");
        }

        if (company.getWebsiteUrl() == null || company.getWebsiteUrl().trim().isEmpty()) {
            throw new InvalidDataException("Company location is required!");
        }

        if (company.getFoundedYear() == null || company.getFoundedYear().trim().isEmpty()) {
            throw new InvalidDataException("Company founded year is required!");
        }

        if (company.getBusinessType() == null) {
            throw new InvalidDataException("Business type is required!");
        }

        if (company.getIndustry() == null) {
            throw new InvalidDataException("Industry is required!");
        }

        return companyRepository.save(company);
    }

    @Override
    public Company getCompanyById(Long companyId) {
        return companyRepository.findById(companyId).orElseThrow(() -> new NotFoundException("Company Not Found!"));
    }

    @Override
    public Company updateCompany(Long companyId, Company company) {
        Company existingCompany = this.getCompanyById(companyId);

        if (company.getName() != null && !company.getName().trim().isEmpty()) {
            existingCompany.setName(company.getName());
        }

        if (company.getDescription() != null && !company.getDescription().trim().isEmpty()) {
            existingCompany.setDescription(company.getDescription());
        }

        if (company.getLocation() != null && !company.getLocation().trim().isEmpty()) {
            existingCompany.setLocation(company.getLocation());
        }

        if (company.getLogoUrl() != null && !company.getLogoUrl().trim().isEmpty()) {
            existingCompany.setLogoUrl(company.getLogoUrl());
        }

        if (company.getWebsiteUrl() != null && !company.getWebsiteUrl().trim().isEmpty()) {
            existingCompany.setWebsiteUrl(company.getWebsiteUrl());
        }

        if (company.getFoundedYear() != null && !company.getFoundedYear().trim().isEmpty()) {
            existingCompany.setFoundedYear(company.getFoundedYear());
        }

        if (company.getOwnerEmail() != null && !company.getOwnerEmail().trim().isEmpty()) {
            existingCompany.setOwnerEmail(company.getOwnerEmail());
        }

        if (company.getOwnerName() != null && !company.getOwnerName().trim().isEmpty()) {
            existingCompany.setOwnerName(company.getOwnerName());
        }

        if (company.getOwnerPhoneNumber() != null && !company.getOwnerPhoneNumber().trim().isEmpty()) {
            existingCompany.setOwnerPhoneNumber(company.getOwnerPhoneNumber());
        }

        if (company.getSize() != null && !company.getSize().trim().isEmpty()) {
            existingCompany.setSize(company.getSize());
        }

        if (company.getBusinessType() != null) {
            existingCompany.setBusinessType(company.getBusinessType());
        }

        if (company.getIndustry() != null) {
            existingCompany.setIndustry(company.getIndustry());
        }

        if (company.isActive() != existingCompany.isActive()) {
            existingCompany.setActive(company.isActive());
        }


        return companyRepository.save(existingCompany);
    }

    @Override
    public void deleteCompany(Long companyId) {
        Company company = this.getCompanyById(companyId);
        companyRepository.delete(company);
    }

    @Override
    public List<Company> getAllCompanies() {
        return companyRepository.findAll();
    }

    @Override
    public List<Company> getCompaniesByIndustry(Industry industry) {
        return companyRepository.findByIndustry(industry);
    }

    @Override
    public List<Company> getCompaniesByLocation(String location) {
        return companyRepository.findByLocation(location);
    }

    @Override
    public List<Company> getCompaniesByBusinessType(BusinessType businessType) {
        return companyRepository.findByBusinessType(businessType);
    }

    @Override
    public List<Company> searchCompanies(String keyword) {
        return companyRepository.findByNameContainingIgnoreCase(keyword);
    }

    @Override
    public List<Company> getCompaniesSortedBy(String fieldName) {
        return companyRepository.findAll(Sort.by(Sort.Direction.ASC));
    }
}
