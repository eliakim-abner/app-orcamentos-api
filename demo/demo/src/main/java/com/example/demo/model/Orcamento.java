package com.example.demo.model;

public class Orcamento {
    private Long id;
    private String nome;
    private String telefone;
    private String grauOd;
    private String grauOe;
    private Boolean visto;
    private Boolean enviado;

    public Orcamento(){
        
    }

    // getters e setters

    public Orcamento(Boolean enviado, String grauOd, String grauOe, Long id, String nome, String telefone, Boolean visto) {
        this.enviado = enviado;
        this.grauOd = grauOd;
        this.grauOe = grauOe;
        this.id = id;
        this.nome = nome;
        this.telefone = telefone;
        this.visto = visto;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public String getGrauOd() {
        return grauOd;
    }

    public void setGrauOd(String grauOd) {
        this.grauOd = grauOd;
    }

    public String getGrauOe() {
        return grauOe;
    }

    public void setGrauOe(String grauOe) {
        this.grauOe = grauOe;
    }

    public Boolean isVisto() {
        return visto;
    }

    public void setVisto(Boolean visto) {
        this.visto = visto;
    }

    public Boolean isEnviado() {
        return enviado;
    }

    public void setEnviado(Boolean enviado) {
        this.enviado = enviado;
    }
}