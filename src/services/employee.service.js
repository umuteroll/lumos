export class EmployeeService {
  static DEPARTMENTS = ['Analytics', 'Tech'];
  static POSITIONS = ['Junior', 'Medior', 'Senior'];

  constructor() {
    this.employees = [
      {
        id: 1,
        firstName: 'Umut',
        lastName: 'Erol',
        dateOfEmployment: '2023-03-19',
        dateOfBirth: '1990-03-19',
        phone: '5321234567',
        email: 'umut@erol.org',
        department: 'Tech',
        position: 'Senior'
      },
      {
        id: 2,
        firstName: 'John',
        lastName: 'Doe',
        dateOfEmployment: '2024-01-01',
        dateOfBirth: '1985-05-15',
        phone: '5321234567',
        email: 'john@doe.org',
        department: 'Analytics',
        position: 'Junior'
      },
      {
        id: 3,
        firstName: 'Jane',
        lastName: 'Smith',
        dateOfEmployment: '2024-02-15',
        dateOfBirth: '1992-07-20',
        phone: '5321234567',
        email: 'jane@smith.org',
        department: 'Tech',
        position: 'Medior'
      },
      {
        id: 4,
        firstName: 'John',
        lastName: 'Doe',
        dateOfEmployment: '2024-01-01',
        dateOfBirth: '1985-05-15',
        phone: '5321234567',
        email: 'john@doe.org',
        department: 'Analytics',
        position: 'Senior'
      },
      {
        id: 5,
        firstName: 'Jane',
        lastName: 'Smith',
        dateOfEmployment: '2024-02-15',
        dateOfBirth: '1992-07-20',
        phone: '5321234567',
        email: 'jane@smith.org',
        department: 'Tech',
        position: 'Medior'
      },
      {
        id: 6,
        firstName: 'John',
        lastName: 'Doe',
        dateOfEmployment: '2024-01-01',
        dateOfBirth: '1985-05-15',
        phone: '5321234567',
        email: 'john@doe.org',
        department: 'Analytics',
        position: 'Senior'
      },
      { 
        id: 7,
        firstName: 'Jane',
        lastName: 'Smith',
        dateOfEmployment: '2024-02-15',
        dateOfBirth: '1992-07-20',
        phone: '5321234567',
        email: 'jane@smith.org',
        department: 'Tech',
        position: 'Medior'
      }
    ];
  }

  getEmployees({ searchQuery = '', page = 1, itemsPerPage = 10 } = {}) {
    let filteredEmployees = this.employees;

    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase();
      filteredEmployees = this.employees.filter(employee => 
        employee.firstName.toLowerCase().includes(searchLower) ||
        employee.lastName.toLowerCase().includes(searchLower) ||
        employee.department.toLowerCase().includes(searchLower) ||
        employee.position.toLowerCase().includes(searchLower)
      );
    }

    const totalItems = filteredEmployees.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const currentPage = Math.min(Math.max(1, page), totalPages || 1);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const items = filteredEmployees.slice(startIndex, endIndex);

    return {
      items,
      pagination: {
        currentPage,
        totalPages,
        totalItems,
        itemsPerPage
      }
    };
  }

  isEmailTaken(email) {
    return this.employees.some(emp => emp.email.toLowerCase() === email.toLowerCase());
  }

  getEmployeeById(id) {
    return this.employees.find(emp => emp.id === id);
  }

  addEmployee(employee) {
    const newEmployee = {
      ...employee,
      id: this.employees.length + 1
    };
    this.employees.push(newEmployee);
    return newEmployee;
  }

  updateEmployee(id, updatedEmployee) {
    const index = this.employees.findIndex(emp => emp.id === id);
    if (index !== -1) {
      this.employees[index] = { ...updatedEmployee, id };
      return this.employees[index];
    }
    return null;
  }

  deleteEmployee(id) {
    const index = this.employees.findIndex(emp => emp.id === id);
    if (index !== -1) {
      this.employees.splice(index, 1);
      return true;
    }
    return false;
  }
} 