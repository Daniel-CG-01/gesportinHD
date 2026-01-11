package net.ausiasmarch.gesportin.service;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import net.ausiasmarch.gesportin.repository.EquipoRepository;
import net.ausiasmarch.gesportin.entity.*;

@Service
public class EquipoService {
    @Autowired
    EquipoRepository equipoRepository;


    public Long create(EquipoEntity equipoEntity) {
        EquipoEntity savedEquipo = equipoRepository.save(equipoEntity);
        return savedEquipo.getId();
    }

    public Long delete(Long id) {
        equipoRepository.deleteById(id);
        return id;
    }

    public Long update(EquipoEntity equipoEntity) {
        EquipoEntity updatedEquipo = equipoRepository.save(equipoEntity);
        return updatedEquipo.getId();
    }

    public EquipoEntity get(Long id) {
        return equipoRepository.findById(id).orElse(null);
    }

    public List<EquipoEntity> getAll() {
        return equipoRepository.findAll();
    }

    public Long count() {
        return equipoRepository.count();
    }

    
}
