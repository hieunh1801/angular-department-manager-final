-- update lại trường code
update employee e set e.code = concat('EMP', convert(e.id, varchar(10)))
update employee e set e.created_by = 'admin'
update employee e set e.edited_by = 'admin'
update department d set d.code = concat('DEP', convert(d.id, varchar(10)))
update positions e set e.code = concat('POS', convert(e.id, varchar(10)))