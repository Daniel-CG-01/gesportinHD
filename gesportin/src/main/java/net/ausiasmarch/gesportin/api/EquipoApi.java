package net.ausiasmarch.gesportin.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import net.ausiasmarch.gesportin.entity.EquipoEntity;
import net.ausiasmarch.gesportin.service.EquipoService;


@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/equipo")
public class EquipoApi {
    @Autowired
    EquipoService equiEntity;
    // ----------------------------CRUD---------------------------------

    // obtener post por id
    @GetMapping("/{id}")
    public ResponseEntity<EquipoEntity> get(@PathVariable Long id) {
        return ResponseEntity.ok(equiEntity.get(id));
    }

    // crear posts
    @PostMapping("")
    public ResponseEntity<Long> create(@RequestBody EquipoEntity EquipoEntity) {
        return ResponseEntity.ok(equiEntity.create(EquipoEntity));
    }

    // modificar posts
    @PutMapping("")
    public ResponseEntity<Long> update(@RequestBody EquipoEntity EquipoEntity) {
        return ResponseEntity.ok(equiEntity.update(EquipoEntity));
    }

    // borrar posts
    @DeleteMapping("/{id}")
    public ResponseEntity<Long> delete(@PathVariable Long id) {
        return ResponseEntity.ok(equiEntity.delete(id));
    }


}

