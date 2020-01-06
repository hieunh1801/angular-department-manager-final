select 
	e.id as id,
	e.code as code,
	e.name as name,
	e.date_of_bird as dateOfBird,
	e.gender as gender,
	e.email as email,
	e.phonenumber as phonenumber,
	e.created_by as createdBy,
	e.created_date as createdDate,
	e.is_working as isWorking,
	d.id as idDeparment,
	d.name as departmentName,
	p.id as idPositions,
	p.name as positionsName,
	p.salary as salary
from employee e, department d, positions p, work_process wp
where e.id = wp.id_employee and d.id = wp.id_department and p.id = wp.id_positions
and wp.status = 1
order by e.id