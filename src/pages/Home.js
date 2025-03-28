import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePokemon } from "../hooks/usePokemon";
import PokemonGrid from "../components/PokemonGrid";
import PokemonTable from "../components/PokemonTable";

const PAGE_SIZE = 10;
const MAX_PAGE_NUMBERS = 10;

const Home = () => {
    const navigate = useNavigate();
    const [offset, setOffset] = useState(0);
    const { pokemons, loading, filterPokemons, totalPokemons } = usePokemon(offset, PAGE_SIZE);
    const [search, setSearch] = useState("");
    const [viewMode, setViewMode] = useState("grid"); // Estado para alternar vista

    const handleSearch = (e) => {
        setSearch(e.target.value);
        filterPokemons(e.target.value);
    };

    const onImageClick = (pokemonName) => {
        navigate(`/pokemon/${pokemonName}`);
    };

    const totalPages = Math.ceil(totalPokemons / PAGE_SIZE);
    const currentPage = offset / PAGE_SIZE + 1;

    const startPage = Math.floor((currentPage - 1) / MAX_PAGE_NUMBERS) * MAX_PAGE_NUMBERS + 1;
    const endPage = Math.min(startPage + MAX_PAGE_NUMBERS - 1, totalPages);

    return (
        <div>
           
           <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                
                <a className="navbar-brand" href="#">
                    <img src="/image.png" alt="Logo" style={{ width: "50px", height: "auto" }} />
                </a>

                
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarScroll"
                    aria-controls="navbarScroll"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                
                <div className="collapse navbar-collapse justify-content-center" id="navbarScroll">
                    <ul className="navbar-nav text-center">
                        <li className="nav-item">
                            <a className="nav-link active" href="#">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Link</a>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                                Link
                            </a>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="#">Action</a></li>
                                <li><a className="dropdown-item" href="#">Another action</a></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><a className="dropdown-item" href="#">Something else here</a></li>
                            </ul>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link disabled" aria-disabled="true">Link</a>
                        </li>
                    </ul>

                    {/* Sección de búsqueda alineada a la derecha */}
                    <div className="ms-auto">
                        <form className="d-flex" role="search">
                            <input
                                className="form-control me-2 w-75"
                                placeholder="Buscar Pokémon..."
                                type="search"
                                aria-label="Search"
                                value={search}
                                onChange={handleSearch}
                            />
                            <button
                                className="btn text-light btnCus"
                                onClick={() => setViewMode(viewMode === "grid" ? "table" : "grid")}
                            >
                                {viewMode === "grid" ? "Tabla" : "Grid"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            </nav>


            <div className="container">
                <br/><br/><br/>
                {loading ? <p>Cargando...</p> :
                    viewMode === "grid"
                        ? <PokemonGrid pokemons={pokemons} onImageClick={onImageClick} />
                        : <PokemonTable pokemons={pokemons} />
                }

                {/* Paginación */}
                <nav aria-label="Page navigation">
                    <ul className="pagination justify-content-center mt-3">
                        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                            <button className="page-link" onClick={() => setOffset(offset - PAGE_SIZE)}>
                                Anterior
                            </button>
                        </li>

                        {startPage > 1 && (
                            <li className="page-item">
                                <button className="page-link" onClick={() => setOffset((startPage - MAX_PAGE_NUMBERS - 1) * PAGE_SIZE)}>
                                    ...
                                </button>
                            </li>
                        )}

                        {[...Array(endPage - startPage + 1)].map((_, index) => {
                            const pageNumber = startPage + index;
                            return (
                                <li key={pageNumber} className={`page-item ${currentPage === pageNumber ? "active" : ""}`}>
                                    <button className="page-link" onClick={() => setOffset((pageNumber - 1) * PAGE_SIZE)}>
                                        {pageNumber}
                                    </button>
                                </li>
                            );
                        })}

                        {endPage < totalPages && (
                            <li className="page-item">
                                <button className="page-link" onClick={() => setOffset(endPage * PAGE_SIZE)}>
                                    ...
                                </button>
                            </li>
                        )}

                        <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                            <button className="page-link" onClick={() => setOffset(offset + PAGE_SIZE)}>
                                Siguiente
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default Home;
