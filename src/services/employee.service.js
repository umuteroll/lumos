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
        phone: '+90 532 123 45 67',
        email: 'umut@erol.org',
        department: 'Tech',
        position: 'Senior'
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