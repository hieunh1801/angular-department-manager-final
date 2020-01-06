update employee e set e.code = concat('EMP', convert(e.id, varchar(10)))
update employee e set e.created_by = 'admin'
update employee e set e.edited_by = 'admin'

update department d set d.code = concat('DEP', convert(d.id, varchar(10)))
update positions e set e.code = concat('POS', convert(e.id, varchar(10)))
update work_process e set e.code = concat('WOR', convert(e.id, varchar(10)))

-- Select ra nhân viên và chức vụ tương ứng
select e.id as id,
	e.code as code,
	e.name as name,
	e.date_of_bird as dateOfBird,
	e.gender as gender,
	e.email as email,
	e.phonenumber as phonenumber,
	e.created_by as createdBy,
	e.created_date as createdDate,
	e.is_working as isWorking,
	d.id as idDepartment,
	d.name as departmentName,
	p.id as idPositions,
	p.name as positionsName,
	p.salary as salary 
from employee e left join work_process wp on e.id = wp.id_employee left join department d on d.id = wp.id_department left join positions p on wp.id_positions = p.id