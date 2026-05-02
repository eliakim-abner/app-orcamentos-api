
package com.example.demo.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicLong;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.Orcamento;

@RestController
@RequestMapping("/orcamentos")
public class OrcamentoController {

    private final List<Orcamento> lista = new ArrayList<>();
    private final AtomicLong contador = new AtomicLong();

   @PostMapping
public ResponseEntity<?> receber(@RequestBody Orcamento o) {

    o.setId(contador.incrementAndGet());
    o.setVisto(false);
    o.setEnviado(false);

    lista.add(o);

    return ResponseEntity.ok(o);
}

    @GetMapping
public List<Orcamento> listar() {
    return lista;

    }

    @DeleteMapping("/{id}")
public ResponseEntity<?> deletar(@PathVariable Long id) {

    lista.removeIf(o -> o.getId().equals(id));

    return ResponseEntity.ok("Removido");
    }

    @PatchMapping("/{id}/visto")
public ResponseEntity<?> marcarVisto(@PathVariable Long id) {

    lista.forEach(o -> {
        if (o.getId().equals(id)) {
            o.setVisto(true);
        }
    });

    return ResponseEntity.ok("Atualizado");
}

    @PatchMapping("/{id}/enviado")
public ResponseEntity<?> marcarEnviado(@PathVariable Long id) {

    lista.forEach(o -> {
        if (o.getId().equals(id)) {
            o.setEnviado(true);
        }
    });

    return ResponseEntity.ok("Atualizado");
}
}
