using ContractManager.Core.Models;
using CsvHelper.TypeConversion;
using CsvHelper;
using System.Globalization;
using System.IO;
using ContractManager.Abstractions;

namespace ContractManager.Services
{
    public class CsvService : ICsvService
    {
        public (IEnumerable<Contract>?, string) ReadFile(IFormFile file)
        {
            try
            {
                using (var reader = new StreamReader(file.OpenReadStream()))
                using (var csv = new CsvReader(reader, CultureInfo.InvariantCulture))
                {
                    var records = csv.GetRecords<Contract>();
                    return (records.ToList(), string.Empty);
                }
            }
            catch (HeaderValidationException)
            {
                return (null, "CSV file header is invalid.");
            }
            catch (TypeConverterException)
            {
                return (null, "CSV file contains invalid data format.");
            }
            catch (Exception)
            {
                return (null, "Error reading CSV file");
            }
        }
    }
}
