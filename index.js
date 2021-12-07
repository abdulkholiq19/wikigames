const http = require('http');
const express = require('express');
const path = require('path');
const app = express();
const hbs = require('hbs');

app.use(express.json());
app.use(express.static('express'));

app.use('/public', express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

hbs.registerPartials(__dirname + '/views/partials');

// setting encoded data post
app.use(express.urlencoded({ extended: false }))

// setting koneksi
const dbConnection = require('./connection/db')

// setting folder uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// setting multer
const uploadFile = require('./middlewares/uploadFile');
const port = 3300
const pathFile = `http://localhost:${port}/uploads/`

app.get('/', function (req, response) {
  const query = `SELECT * FROM heroes_tb ORDER BY id DESC;`
  
  dbConnection.getConnection((err, conn) => {
    if (err) throw err

    conn.query(query, (err, results, res) => {
      if (err) throw err
      let heroes = []

      for (let result of results) {
        heroes.push({
          ...result,
          photo: pathFile + result.photo
        })
      }
      if (heroes.length == 0) {
        heroes = false
      }

      response.render('index', {
        heroes
      });
    })

    conn.release()
  })

});

app.get('/add-hero', function (req, response) {
  const query = `SELECT * FROM type_tb ORDER BY id DESC;`
  
  dbConnection.getConnection((err, conn) => {
    if (err) throw err

    conn.query(query, (err, results, res) => {
      if (err) throw err
      let typeHero = []

      for (let result of results) {
        typeHero.push({
          ...result
        })
      }
      if (typeHero.length == 0) {
        typeHero = false
      }

      response.render('addHero', {
        typeHero
      });
    })

    conn.release()
  })
});

app.post('/add-hero', uploadFile('image'), function (req, res) {
  const { name, type_id } = req.body
  const image = req.file.filename
  const query = `INSERT INTO heroes_tb (name, photo, type_id) VALUES ("${name}","${image}","${type_id}");`

  dbConnection.getConnection((err, conn) => {
    if (err) throw err

    conn.query(query, (err, results) => {
      if (err) {
        res.redirect('/add-hero')
      } else {
        return res.redirect('/')
      }
    })

    conn.release()
  })

})

app.get('/hero/:id', function (req, res) {
  var { id } = req.params;

  const query = `SELECT * FROM heroes_tb WHERE id = ${id}; SELECT * FROM type_tb ORDER BY id `

  dbConnection.getConnection((err, conn) => {
    if (err) throw err

    conn.query(query,[1,2], (err, results) => {
      if (err) throw err

      const heroes = {
        ...results['0'][0],
        photo: pathFile + results['0'][0].photo
      }
      let type=[]

      for (let result of results) {
        type = {...result}
      }

      if (type.length == 0) {
        type = false
      }
      
      const filterType = Object.values(type).filter(type => type.id === heroes.type_id);

      res.render('detailHero', {
        heroes,
        filterType
      });
    })

    conn.release()
  })
});

app.get('/edit-hero/:id', function (req, res) {
  var { id } = req.params;

  const query = `SELECT * FROM heroes_tb WHERE id = ${id}; SELECT * FROM type_tb ORDER BY id `

  dbConnection.getConnection((err, conn) => {
    if (err) throw err

    conn.query(query,[1,2], (err, results) => {
      if (err) throw err

      const heroes = {
        ...results['0'][0],
        photo: pathFile + results['0'][0].photo
      }
      const typeHero = {
        ...results['1'],
        type_id: results['0'][0].name
      };
      console.log("type :", heroes);

      res.render('editHero', {
        heroes,
        typeHero
      });
    })

    conn.release()
  })
});


app.post('/edit-hero', uploadFile('image'), function (req, res) {
  const { id, name, type_id, oldImage } = req.body

  let image = oldImage.replace(pathFile, '');

  if (req.file) {
    image = req.file.filename;
  }

  const query = `UPDATE heroes_tb SET name = "${name}", type_id = "${type_id}", photo = "${image}" WHERE id = ${id}`;

  dbConnection.getConnection((err, conn) => {
    // if (err) throw err;
    if (err) {
      console.log(err);
    }

    conn.query(query, (err, results) => {
      // if (err) throw err;

      if (err) {
        console.log(err);
      }
      res.redirect(`/hero/${id}`);
    });

  });
});

app.get('/delete-hero/:id', function (req, res) {
  const { id } = req.params

  const query = `DELETE FROM heroes_tb WHERE id = ${id}`

  dbConnection.getConnection((err, conn) => {
    if (err) throw err

    conn.query(query, (err, results) => {
      if (err) {
        res.redirect(`/hero/${id}`)
      } else {
        res.redirect('/')
      }
    })

    conn.release()
  })
})

app.get('/add-type', function (req, response) {
  response.render('addType');
});


app.post('/add-type', function (req, res) {
  const { id, name } = req.body
  const query = `INSERT INTO type_tb (name) VALUES ("${name}");`

  dbConnection.getConnection((err, conn) => {
    if (err) throw err

    conn.query(query, (err, results) => {
      if (err) {
        res.redirect('/add-type')
      } else {
        return res.redirect('/')
      }
    })

    conn.release()
  })

})

const server = http.createServer(app);
server.listen(port);
console.debug('Server listening on port ' + port);
