# Societech CI4 Migration Notes

## Database

Suggested local database name:

```sql
societech_financial_monitoring
```

Update `.env` in the CI4 project with your XAMPP MySQL credentials:

```ini
database.default.hostname = localhost
database.default.database = societech_financial_monitoring
database.default.username = root
database.default.password =
database.default.DBDriver = MySQLi
database.default.port = 3306
```

Then run:

```powershell
php spark migrate
php spark db:seed SocietechInitialSeeder
```

Seeded admin:

- Email: `admin@societech.local`
- Password: `admin12345`

## Conversion Status

This first CI4 slice adds the database foundation, starter models, route/controller shells, and a legacy bridge under `public/legacy`.

Next conversion slices should replace each legacy HTML page with CI4 views and move data access from localStorage/static JavaScript into controllers, models, and JSON endpoints.
