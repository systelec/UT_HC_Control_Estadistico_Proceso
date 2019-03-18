--
-- PostgreSQL database dump
--

-- Dumped from database version 11.2 (Debian 11.2-1.pgdg90+1)
-- Dumped by pg_dump version 11.2 (Debian 11.2-1.pgdg90+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: historicos; Type: TABLE; Schema: public; Owner: sysa
--

CREATE TABLE public.historicos (
    fecha timestamp with time zone,
    pv real,
    sp real,
    tk real,
    codigo_producto real,
    disparo_alarma boolean,
    tendencia_id integer
);


ALTER TABLE public.historicos OWNER TO sysa;

--
-- Data for Name: historicos; Type: TABLE DATA; Schema: public; Owner: sysa
--

COPY public.historicos (fecha, pv, sp, tk, codigo_producto, disparo_alarma, tendencia_id) FROM stdin;
\.


--
-- Name: historicos historicos_tendencia_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: sysa
--

ALTER TABLE ONLY public.historicos
    ADD CONSTRAINT historicos_tendencia_id_foreign FOREIGN KEY (tendencia_id) REFERENCES public.tendencias(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

