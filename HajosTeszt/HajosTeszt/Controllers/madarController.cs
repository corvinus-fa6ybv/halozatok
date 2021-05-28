using HajosTeszt.madarModels;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace HajosTeszt.Controllers
{
    [Route("api/madarak")]
    [ApiController]
    public class madarController : ControllerBase
    {
        // GET: api/<madarController>
        [HttpGet]
        public IEnumerable<Fa6ybv> Get()
        {
            SzamhaloContext context = new SzamhaloContext();
            return context.Fa6ybvs.ToList();
        }

        // GET api/madarak/5
        [HttpGet("{id}")]
        public Fa6ybv Get(int id)
        {
            SzamhaloContext context = new SzamhaloContext();
            var madar = (from x in context.Fa6ybvs
                                where x.MadarSk == id
                                select x).FirstOrDefault();
            return madar;
        }

        // POST api/madarak
        [HttpPost]
        public void Post([FromBody] Fa6ybv újMadar)
        {
            SzamhaloContext context = new SzamhaloContext();
            context.Fa6ybvs.Add(újMadar);
            context.SaveChanges();
        }

        // DELETE api/madarak/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            SzamhaloContext context = new SzamhaloContext();
            var torlendoMadar = (from x in context.Fa6ybvs
                                where x.MadarSk == id
                                select x).FirstOrDefault();
            context.Remove(torlendoMadar);
            context.SaveChanges();
        }
    }
}
